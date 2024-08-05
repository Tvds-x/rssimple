import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="icon">
          {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
          <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* <span className="sr-only">Toggle theme</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// import { Switch } from "@/components/ui/switch";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "@/components/theme-provider";

// export function ModeToggle() {
//   const { theme, setTheme } = useTheme();
//   const isDarkMode = () => theme === "dark";
//   const handleChange = () => {
//     if (isDarkMode()) {
//       setTheme("light");
//     } else {
//       setTheme("dark");
//     }
//   };

//   return (
//     <div className="flex items-center">
//       <Sun
//         className={`mr-2 ${isDarkMode() ? "text-gray-400" : "text-yellow-500"}`}
//       />
//       <Switch checked={theme === "dark"} onCheckedChange={handleChange} />
//       <Moon
//         className={`ml-2 ${isDarkMode() ? "text-blue-500" : "text-gray-400"}`}
//       />
//     </div>
//   );
// }
