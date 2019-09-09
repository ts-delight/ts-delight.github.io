import { Application } from "stimulus";
import { PlaygroundController } from "./playground-controller";
import { TabController } from "./tab-controller";

export const setup = () => {
  const application = Application.start();
  application.register("playground", PlaygroundController);
  application.register("tab", TabController);
};
