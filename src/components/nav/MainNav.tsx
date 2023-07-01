import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export default function MainNav() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Item one</NavigationMenu.Trigger>
          <NavigationMenu.Content>Item one content</NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Item two</NavigationMenu.Trigger>
          <NavigationMenu.Content>Item Two content</NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
