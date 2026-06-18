type SessionExpiredListener = (message: string) => void;

const SESSION_EXPIRED_EVENT = "app:session-expired";

export function showSessionExpired(message: string) {
  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT, { detail: message }));
}

export function subscribeToSessionExpired(listener: SessionExpiredListener) {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<string>;
    listener(customEvent.detail);
  };

  window.addEventListener(SESSION_EXPIRED_EVENT, handler);

  return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handler);
}
