var figlet = require("figlet");

figlet(`Employee    Manager`,

{
    horizontalLayout: "fitted",
    verticalLayout: "default",
    whitespaceBreak: true,
  },
    function (err, data) {
        if (err) {
            console.log("Unexpected Error");
            console.dir(err);
            return;
        }
        console.log(data);
    });