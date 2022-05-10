import { IconBankFill, IconBriefcase, IconClipboardList, IconServices, IconUserCheck, IconUsers } from "./icons";

export const menuList = [
    {
        category: "PEOPLE",
        role: "admin",
        menu: [
            {
                title: "Users",
                link: "/users",
                icon: <IconUsers />
            // },
            // {
            //     title: "General",
            //     link: "/general",
            //     icon: <IconGroup />
            }
        ]
    },
    {
        category: "PROGRAMME",
        cohort: true,
        menu: [
            {
                title: "Course Information",
                link: "/cohort",
                icon: <IconBriefcase />
            },
            {
                title: "Assignments",
                link: "/assignments",
                icon: <IconClipboardList />
            },
            // {
            //     title: "Loan Products",
            //     icon: <IconMoneyHand24Regular />
            // },
            {
                title: "Forums",
                link: "/forums",
                icon: <IconBankFill />
            },
            {
                title: "Request Meeting",
                link: "/request_meeting",
                icon: <IconServices />
            },
            // {
            //     title: "Fees and Charges",
            //     icon: <IconCoins />
            // },
            // {
            //     title: "Transactions",
            //     icon: <Icontransfer />
            // },
            // {
            //     title: "Services",
            //     icon: <IconServices />
            // },
            // {
            //     title: "Settlements",
            //     icon: <IconScript />
            // },
            // {
            //     title: "Reports",
            //     icon: <IconChartBar />
            // }
        ]
    },
    {
        category: "SETTINGS",
        menu: [
            // {
            //     title: "Preferences",
            //     icon: <IconSliders2 />
            // },
            {
                title: "Profile",
                link: "/profile",
                icon: <IconUserCheck />
            },
            // {
            //     title: "Edit Profile",
            //     link: "/edit_profile",
            //     icon: <IconUserSettingsVariant />
            // }
        ]
    },
]