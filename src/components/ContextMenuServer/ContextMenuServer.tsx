import { SERVER_SETTINGS_INVITES } from "../../common/RouterEndpoints";
import useCustomNavigate from "../../common/useCustomNavigate";
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu";

type Props = Omit<ContextMenuProps, 'items'> & {
  serverId?: string
}

export function ContextMenuServer (props: Props) {
  const customNavigate = useCustomNavigate();
  return (
    <ContextMenu {...props} items={[
      {icon: 'markunread_mailbox', label: "Mark As Read", disabled: true},
      {separator: true},
      {icon: 'mail', label: "Invites", onClick: () => customNavigate(SERVER_SETTINGS_INVITES(props.serverId!))},
      {icon: 'settings', label: "Settings", disabled: true},
      {separator: true},
      {icon: 'copy', label: "Copy ID", disabled: true},
      {separator: true},
      {icon: 'logout', label: "Leave", alert: true, disabled: true},
    ]} />
  )
}