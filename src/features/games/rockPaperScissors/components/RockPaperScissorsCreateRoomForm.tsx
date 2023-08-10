import { Button, Form, LabelledInput, Labelledselect } from "components/form";
import { useCallback, useEffect, useState } from "react";
import { Settings } from "..";
import { defaultSettingsModel } from "../utility/settings";
import { getSettingsMeta } from "../utility/getSettingsMeta";
import { Center } from "components/layout";

const settingsMeta = getSettingsMeta();

export function RockPaperScissorsCreateRoomForm() {
  const [settings, setSettings] = useState<Settings>(
    defaultSettingsModel
  );

  const getSettings = useCallback(async() => {
    return defaultSettingsModel;
  }, [])

  const handleSubmit = useCallback(() => {
    return;
  }, [])

  useEffect(() => {
    getSettings().then(setSettings)
  }, [getSettings])

  console.log('creat room form rerender')
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
                    onChange={() => {}}
                    type={meta.inputType}
                  />
                );
              }
              case 'select': {
                return (
                  <Labelledselect
                    { ...commonProps }
                    value={settings[settingsName].toString()}
                    onValueChange={() => {}}
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
