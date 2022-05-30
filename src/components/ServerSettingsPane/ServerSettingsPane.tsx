import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ServerSettings, { ServerSetting } from '../../common/ServerSettings';
import { CustomSuspense } from '../CustomSuspense/CustomSuspense';
import ServerSettingsHeader from '../ServerSettingsHeader/ServerSettingsHeader';
import styles from './ServerSettingsPane.module.scss'

export default function ServerSettingsPane() {
  const {path} = useParams();
  const [setting, setSetting] = useState<ServerSetting | null>(null);

  useEffect(() => {
    setSetting(ServerSettings[path!]);
  }, [path]);

  if (!setting) {
    return null;
  }

  return (
    <div className={styles.pane}>
      <ServerSettingsHeader/>
      <CustomSuspense>
        <setting.element/>
      </CustomSuspense>
    </div>
  );

}