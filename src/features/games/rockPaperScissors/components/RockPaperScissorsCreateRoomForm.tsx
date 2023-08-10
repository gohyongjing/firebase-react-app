import { Button, Form, LabelledInput, Labelledselect } from "components/form";
import { FormEvent, useCallback, useEffect } from "react";
import { Settings } from "..";
import { defaultSettingsModel } from "../utility/settings";
import { getSettingsMeta } from "../utility/getSettingsMeta";
import { Center } from "components/layout";
import { getSettingsByHostId, saveSetting } from "../api";
import { useAuthContext } from "features/auth";
import { useInputsHandler } from "hooks";
import { useUser } from "features/user";

const settingsMeta = getSettingsMeta();

export function RockPaperScissorsCreateRoomForm() {
  const firebaseUser = useAuthContext();
  const user = useUser(firebaseUser?.uid);

  const {values: settings, setValue: setSetting, setValues: setSettings} = useInputsHandler<Settings & { id?: string}>(
    defaultSettingsModel
  );

  const getSettings = useCallback(async() => {
    if (firebaseUser?.uid) {
      return getSettingsByHostId(firebaseUser.uid);
    }
  }, [firebaseUser?.uid])

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(settings)
    if (!settings.id) {
      return saveSetting(settings);
    }
    return saveSetting(settings.id, settings);
  }, [settings])

  useEffect(() => {
    getSettings().then(settings => {
      if (!settings) {
        if (!user) {
          return;
        }
        setSettings({
          ...defaultSettingsModel,
          roomName: `${user.userName}'s Rock Paper Scissors room`,
          hostId: user.id
        })
        return;
      } 
      setSettings(settings);
    })
  }, [user, getSettings, setSettings])

  console.log('creat room form rerender', settings)
  return (
    <Form onSubmit={handleSubmit}>
      <Center>
        {
          Object.keys(settingsMeta).map(key => {
            const settingsName = key as keyof typeof settingsMeta;
            const meta = settingsMeta[settingsName];
            const commonProps = {
              key: settingsName,
              id: settingsName,
              label: meta.label
            }
            switch (meta.inputType) {
              case 'text':
                // fallthrough
              case 'number': {
                return (
                  <LabelledInput
                    { ...commonProps }
                    value={settings[settingsName]}
                    onChange={e => setSetting(settingsName, e.target.value)}
                    type={meta.inputType}
                  />
                );
              }
              case 'select': {
                return (
                  <Labelledselect
                    { ...commonProps }
                    value={settings[settingsName].toString()}
                    onValueChange={value => setSetting(settingsName, value)}
                    selectItems={meta.options.map(option => {
                      const value = option.toString();
                      const label = value.slice(0, 1).toUpperCase() + value.slice(1)
                      return {
                        value,
                        label
                      }
                    })}
                  />
                );
              }
              default: {
                return (
                  <></>
                );
              }         
            } 
          })
        }
        <Button className="wide mt-4">
          Create Room
        </Button>
      </Center>
    </Form>
  );
}
