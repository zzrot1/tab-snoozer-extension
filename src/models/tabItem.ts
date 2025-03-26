export class TabItem {
  private processedUrl;

  constructor(
    private readonly url: string,
    private readonly title: string,
    private readonly icon?: string
  ) {
    this.processedUrl = this.processUrl(url);
  }

  private processUrl(url: string) {
    try {
      const hostname = new URL(url).hostname;
      return hostname;
    } catch (e) {
      throw new Error('Invalid url, may not be safe 💥');
    }
  }

  public getProcessedUrl() {
    return this.processedUrl;
  }
}
