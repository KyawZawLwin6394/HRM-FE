import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme()
    return (
        <Switch
            defaultSelected
            size="lg"
            color="default"
            thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                    <SunIcon className={className} />
                ) : (
                    <MoonIcon className={className} />
                )
            }
            checked={theme === "light"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
        </Switch>
    );
}
