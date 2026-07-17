'use client';

import { ActionIcon, Menu } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import LogoutIcon from '@/components/LogoutIcon';
import PersonIcon from '@/components/PersonIcon';
import { ROUTES } from '@/core/constants/routes.constant';
import { clearAuthTokens } from '@/lib/auth/client';

import classes from './AuthMenu.module.css';

const AuthMenu = () => {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthTokens();
    router.push(ROUTES.auth.signIn);
    router.refresh();
  };

  return (
    <Menu
      classNames={{
        divider: classes.divider,
        dropdown: classes.dropdown,
        item: classes.item,
        itemLabel: classes.itemLabel
      }}
      offset={8}
      position='bottom-end'
      width={190}
    >
      <Menu.Target>
        <ActionIcon aria-label='Account menu' size='lg' variant='subtle'>
          <PersonIcon size='20' />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} href={ROUTES.profile} leftSection={<PersonIcon />}>
          Profile
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          className={classes.logoutItem}
          leftSection={<LogoutIcon />}
          onClick={handleLogout}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AuthMenu;
