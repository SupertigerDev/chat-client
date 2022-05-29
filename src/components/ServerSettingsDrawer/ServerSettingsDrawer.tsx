import styles from './ServerSettingsDrawer.module.scss';
import ServerDrawerHeader from '../ServerDrawerHeader/ServerDrawerHeader';
import { Icon } from '../Icon/Icon';
import { classNames, conditionalClass } from '../../common/classNames';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ServerSettings, { ServerSetting } from '../../common/ServerSettings';

export default function ServerSettingsDrawer() {
  return (
    <div>
      <ServerDrawerHeader />
      <SettingsList />
    </div>
  )
}

function SettingsList () {
  const {path} = useParams();
  const [settings, setSettings] = useState<ServerSetting[]>([]);

  useEffect(() => {
    setSettings(Object.values(ServerSettings));
  }, [])


  return (
    <div>
      {settings.map(setting => 
        <Item key={setting.path} icon={setting.icon} label={setting.name} selected={path === setting.path} />
      )}
    </div>
  )
}


function Item (props: {icon: string, label: string, selected?: boolean, onClick?: () => void}) {
  return (
    <div className={classNames(styles.item, conditionalClass(props.selected, styles.selected))}>
      <Icon name={props.icon} size={18} />
      <div className={styles.label}>{props.label}</div>
    </div>
  )
}