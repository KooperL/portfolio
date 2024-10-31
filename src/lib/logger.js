let session = generateSession();
let session_inc = 0;

function generateSession() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

async function getIdentifier() {
  try {
    const id = await localStorage.getItem("identifier");
    return id || "no-identifier";
  } catch (e) {
    console.error("Error accessing localStorage:", e);
    return "no-identifier";
  }
}

async function makeOpts(payload) {
  const identifier = await getIdentifier();
  return {
    ...payload,
    submitted_on: new Date().toISOString().split("T")[0],
    source: "web-prod-1.0",
    host: window.navigator.userAgent,
    identifier,
    session: session,
    session_inc: session_inc,
  };
}

async function sendLog(loggerPayload) {
  const url = "https://events.logridge.net/api/log/b3z9x5nvey57oo5";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token": "8325ea35-191a-4d47-bd7b-150f151ecb27",
    },
    body: JSON.stringify(loggerPayload),
  };

  try {
    return await fetch(url, options);
  } catch (e) {
    console.error("Network error during logging:", e);
    throw e;
  }
}

async function lawg(level, title, body) {
  try {
    let telemetryEnabled = true;
    const consoleMethod = level === "trace" ? "log" : level;
    console[consoleMethod]?.(body);

    if (telemetryEnabled) {
      const loggerPayload = {
        title,
        detail: body,
        channel: "fetch",
        level,
      };

      const enrichedPayload = await makeOpts(loggerPayload);
      await sendLog(enrichedPayload);
    }

    session_inc++;
  } catch (e) {
    console.error("==============", e);
  }
}

async function error(title, body) {
  return lawg("error", title, body);
}

async function warn(title, body) {
  return lawg("warn", title, body);
}

async function info(title, body) {
  return lawg("info", title, body);
}

async function debug(title, body) {
  return lawg("debug", title, body);
}

async function trace(title, body) {
  return lawg("trace", title, body);
}

export const logger = {
  error,
  warn,
  info,
  debug,
  trace,
};
