import Crontab from "reactjs-crontab";
import "reactjs-crontab/dist/index.css";

// https://d180vcwahe2y6s.cloudfront.net/index.html
// https://www.npmjs.com/package/reactjs-crontab
// https://shawnscoding.medium.com/the-easiest-way-to-automate-or-schedule-component-rendering-in-react-app-f4df7784e1ea
// https://github.com/browserslist/browserslist
// https://github.com/shawnscoding/reactjs-crontab
const sayHello = () => {
  console.log("Hello");
};

/* 
Inside the components 
const tasks = React.useMemo(
  () => [
    {
      fn: sayHello,
      config: "* * * * *",
      // Execute every minutes
      id: "1", // optional
      name: "Say Hello", // optional
    },
  ],
  []
);

<Crontab
  tasks={tasks}
  timeZone="UTC"
  // timezone is UTC timezone.
  dashboard={{
    hidden: false, // if true, dashboard is hidden
    route: "/cron",
    // if true, dashboard is hidden
  }}
/>; */
