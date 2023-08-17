export class GetDateTime {
  private date: Date;

  constructor(isoString: string | Date | number) {
    this.date = new Date(isoString);
  }

  Date(): string {
    return this.date.toISOString().split("T")[0];
  }

  Day(options?: Intl.DateTimeFormatOptions): string {
    return this.date.toLocaleDateString(undefined, {
      day: options?.day || "numeric",
    });
  }

  Month(options?: Intl.DateTimeFormatOptions): string {
    return this.date.toLocaleDateString(undefined, {
      month: options?.month || "numeric",
    });
  }

  Hour(): number {
    return this.date.getHours();
  }

  Minute(): number {
    return this.date.getMinutes();
  }

  Second(): number {
    return this.date.getSeconds();
  }
}
