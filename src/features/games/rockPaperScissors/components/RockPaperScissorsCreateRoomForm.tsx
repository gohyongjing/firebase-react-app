import { Button, Form, LabelledInput } from "components/form";
import { useCallback, useEffect, useState } from "react";
import { Settings } from "..";
import { defaultSettingsModel } from "../utility/settings";
import { getSettingsMeta } from "../utility/getSettingsMeta";

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
      {
        Object.keys(settingsMeta).map(key => {
          const settingsName = key as keyof typeof settingsMeta;
          const meta = settingsMeta[settingsName];
          const commonProps = {
            key: settingsName,
            id: settingsName,
          }
          switch (meta.inputType) {
            case 'text':
              // fallthrough
            case 'number': {
              return (
                <LabelledInput
                  { ...commonProps }
                  labelText={meta.label}
                  value={settings[settingsName]}
                  onChange={() => {}}
                  type={meta.inputType}
                >
                </LabelledInput>
              );
            }
            case 'select': {
              return (
                <div {...commonProps}></div>
              );
            }
            default: {
              return (
                <div {...commonProps}></div>
              );
            }         
          } 
        })
      }
      <Button>
        Create Room
      </Button>
    </Form>
  );
}
