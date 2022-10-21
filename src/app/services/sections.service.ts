import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  public countOfSections!: number
  public emptyArrayOfSections: Array<any> = []
  public body: any
  public allBodySections!: NodeListOf<HTMLElement>
  public currentSection: string = "main"
  public delay: number = 0
  public sectionsMap: Map<string, HTMLElement> = new Map()

  constructor() {
    setTimeout(() => {

      this.allBodySections = document.querySelectorAll("main section")
      this.countOfSections = this.allBodySections.length;
      this.emptyArrayOfSections[this.countOfSections - 1] = null;
      this.allBodySections.forEach((htmlSectionElement) => {
        this.sectionsMap.set(htmlSectionElement.id, htmlSectionElement)
      })
    })
  }

}
