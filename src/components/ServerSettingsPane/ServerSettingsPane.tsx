import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ServerSettings, { ServerSetting } from '../../common/ServerSettings';
import { CustomSuspense } from '../CustomSuspense/CustomSuspense';
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

  return (<CustomSuspense><setting.element/></CustomSuspense>);

}