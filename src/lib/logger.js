class Logger {
  session = "";
  session_inc = 0;
  tenant = "pento";
  version = "1.0.0";

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

    (payload.submitted_on = date.toISOString().split("T")[0]),
      (payload.source = {
        source: `web-prod`,
        tenant: this.tenant,
      });
    payload.system = {
      host: window.navigator.userAgent,
    };
    payload.user = {
      identifier: identifier,
      session: this.session,
      session_inc: this.session_inc,
    };
    return payload;
  }

  async fetch(loggerPayload) {
    const url = "https://logger.pockethost.io" + "/api/custom/log";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
