import { Button, Form, LabelledInput, Labelledselect } from "components/form";
import { FormEvent, useCallback, useEffect } from "react";
import { Settings } from "..";
import { defaultSettingsModel } from "../utility/settings";
import { getSettingsMeta } from "../utility/getSettingsMeta";
import { Center } from "components/layout";
import { createRoom, getSettingsByHostId, saveSetting } from "..";
import { useAuthContext } from "features/auth";
import { useInputsHandler } from "hooks";
import { useUser } from "features/user";
import { useNavigate } from "lib/reactRouterDom";
import { PATH_GAMES_ROCK_PAPER_SCISSORS_ROOM } from "routes";

const settingsMeta = getSettingsMeta();

export function RockPaperScissorsCreateRoomForm() {
  const navigate = useNavigate();
  const firebaseUser = useAuthContext();
  const user = useUser(firebaseUser?.uid);

  const {
    values: settings,
    setValue: setSetting,
    setValues: setSettings
  } = useInputsHandler<Settings & { id?: string}>(
    defaultSettingsModel
  );

  const getSettings = useCallback(async() => {
    if (firebaseUser?.uid) {
      return getSettingsByHostId(firebaseUser.uid);
    }
  }, [firebaseUser?.uid])

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings.id) {
      saveSetting(settings);
    } else {
      saveSetting(settings.id, settings);
    }
    const roomRef = await createRoom(settings);
    if (!roomRef) {
      return;
    }
    navigate(`${PATH_GAMES_ROCK_PAPER_SCISSORS_ROOM}/${roomRef.id}`);
  }, [settings, navigate])

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
