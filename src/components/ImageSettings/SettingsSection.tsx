export interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SettingsSection({
  title,
  children,
}: SettingsSectionProps) {
  return (
    <section className="flex flex-col gap-2 w-1/4 min-w-max">
      <h1 className="text-center font-medium underline underline-offset-2 uppercase">
        {title}
      </h1>
      {children}
    </section>
  );
}
