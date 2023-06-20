export type TabItemProps = {
    icon: JSX.Element;
    name: string;
    path: string;
    active: boolean;
};

export type FloatingTabBarProps = {
    items: Omit<TabItemProps, 'active'>[];
};
