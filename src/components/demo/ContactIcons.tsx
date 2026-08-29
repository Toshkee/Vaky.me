type IconProps = { className?: string };

const iconProps = {
  "aria-hidden": true,
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
};

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.5" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z" />
      <path d="M9 8.2c.3 2.7 2.2 4.7 5 5.5l1.2-1.3 2 .9c-.4 1.8-1.6 2.6-3.2 2.3-3.8-.8-6.4-3.6-6.8-7.2-.1-1.3.6-2.2 2-2.5l1 1.9L9 8.2Z" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M7.2 3.5 10 7.8 8.3 9.5c1 2.6 3 4.6 5.6 5.6l1.8-1.7 4.1 2.9-.8 3c-.3 1-1.3 1.6-2.3 1.4C9.8 19.5 4.4 14.1 3.2 7.2 3 6.2 3.6 5.2 4.6 5l2.6-1.5Z" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M3.5 10h17M8 14h3v3H8z" />
    </svg>
  );
}
