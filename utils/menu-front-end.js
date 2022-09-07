const getMenuFrontend = (userRole) => {
  const menu = [
    {
      title: "dashboard",
      icon: "mdi mdi-gauge",
      openSubmenus: false,
      submenu: [
        {
          title: "Main",
          url: "/",
        },
        {
          title: "progressBar",
          url: "progress",
        },
        {
          title: "Graficas",
          url: "chart",
        },
        {
          title: "Promesas",
          url: "promesas",
        },
        {
          title: "Rxjs",
          url: "rxjs",
        },
      ],
    },
    {
      title: "maintenance",
      icon: "mdi mdi-folder-lock-open",
      openSubmenus: false,
      submenu: [
        // {
        //   title: "users",
        //   url: "users",
        // },
        {
          title: "hospitals",
          url: "hospitals",
        },
        {
          title: "doctors",
          url: "doctors",
        },
      ],
    },
  ];

  if (userRole === "ADMIN_ROLE") {
    // menu[1].submenu = [...menu[1].submenu, { title: "users", url: "users" }];  // option 1.
    menu[1].submenu.unshift({ title: "users", url: "users" }); // option 1
  }

  return menu;
};

module.exports = {
  getMenuFrontend,
};
