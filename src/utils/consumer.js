import { createConsumer } from "@rails/actioncable";

const cableUrl = import.meta.env.VITE_WS_URL;

const consumer = createConsumer(cableUrl);

export default consumer;
