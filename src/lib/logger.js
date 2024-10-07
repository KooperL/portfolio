class Logger {
  session = "";
  session_inc = 0;

  constructor() {
    this.session =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }

  async getIdentifier() {
    const id = await localStorage.getItem("identifier");
    if (id) {
      return id;
    }
    return "no-identifier";
  }

  async makeOpts(payload) {
    const date = new Date();
    const identifier = await this.getIdentifier();

    payload.submitted_on = date.toISOString().split("T")[0];
    payload.source = `web-prod-1.0`;
    payload.host = window.navigator.userAgent;
    payload.identifier = identifier;
    payload.session = this.session;
    payload.session_inc = this.session_inc;
    return payload;
  }

  async fetch(loggerPayload) {
    const url =
      "https://logger-commercial.pockethost.io" +
      "/api/log" +
      "/b3z9x5nvey57oo5";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": "8325ea35-191a-4d47-bd7b-150f151ecb27",
      },
      body: JSON.stringify(loggerPayload),
    });
    return res;
  }

  async error(title, body, telemetryEnabled = true) {
    const loggerPayload = {
      title: title,
      detail: body,
      channel: "fetch",
      level: "error",
    };
    try {
      console.error(body);

      if (telemetryEnabled) {
        await this.makeOpts(loggerPayload);
        await this.fetch(loggerPayload);
      }

      this.session_inc++;
    } catch (e) {
      console.error("==============", e);
    }
  }

  async warn(title, body, telemetryEnabled = true) {
    const loggerPayload = {
      title: title,
      detail: body,
      channel: "fetch",
      level: "warn",
    };
    try {
      console.warn(body);

      if (telemetryEnabled) {
        await this.makeOpts(loggerPayload);
        await this.fetch(loggerPayload);
      }

      this.session_inc++;
    } catch (e) {
      console.error("==============", e);
    }
  }

  async info(title, body, telemetryEnabled = true) {
    const loggerPayload = {
      title: title,
      detail: body,
      channel: "fetch",
      level: "info",
    };
    try {
      console.info(body);

      if (telemetryEnabled) {
        await this.makeOpts(loggerPayload);
        await this.fetch(loggerPayload);
      }

      this.session_inc++;
    } catch (e) {
      console.error("==============", e);
    }
  }

  async debug(title, body, telemetryEnabled = true) {
    const loggerPayload = {
      title: title,
      detail: body,
      channel: "fetch",
      level: "debug",
    };
    try {
      console.debug(body);

      if (telemetryEnabled) {
        await this.makeOpts(loggerPayload);
        await this.fetch(loggerPayload);
      }

      this.session_inc++;
    } catch (e) {
      console.error("==============", e);
    }
  }

  async trace(title, body, telemetryEnabled = true) {
    const loggerPayload = {
      title: title,
      detail: body,
      channel: "fetch",
      level: "trace",
    };
    try {
      console.log(body);

      if (telemetryEnabled) {
        await this.makeOpts(loggerPayload);
        await this.fetch(loggerPayload);
      }

      this.session_inc++;
    } catch (e) {
      console.error("==============", e);
    }
  }
}

export const logger = new Logger();
