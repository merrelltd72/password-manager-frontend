import { createConsumer } from "@rails/actioncable";

const cableUrl = "ws://localhost:3000/cable";
// process.env.REACT_APP_CABLE_URL || "ws://localhost:3000/cable"

const consumer = createConsumer(cableUrl);

export default consumer;
