import {
  HomeIcon,
  UsersIcon,
  LockOpenIcon,
  UserPlusIcon,
  ClipboardIcon,
} from "@heroicons/vue/24/outline";

export default function useNavigationRoute() {
  const navigationItems = computed(() => [
    {
      title: "Dashboard",
      icon: HomeIcon,
      route: { name: "admin-dashboard" },
      children: [],
    },
    {
      title: "Roles & Permission",
      icon: LockOpenIcon,
      route: { name: "admin-roles-and-permission" },
      children: [],
    },
    {
      title: "Invite User",
      icon: UserPlusIcon,
      route: { name: "admin-invite-user" },
      children: [],
    },
    {
      title: "User List",
      icon: ClipboardIcon,
      route: { name: "admin-user-list" },
      children: [],
    },
    {
      title: "Manage Team",
      icon: UsersIcon,
      route: { name: "admin-manage-team" },
      children: [],
    },
  ]);

  const drawer = useState("drawer", () => true);
  const toggleDrawer = () => (drawer.value = !drawer.value);

  return {
    navigationItems,
    drawer,
    toggleDrawer,
  };
}
