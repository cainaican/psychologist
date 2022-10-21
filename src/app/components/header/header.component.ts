import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {SectionsService} from "../../services/sections.service";

enum ESections {
  "main",
  "about",
  "consult",
  "sign",
  "form",
  "connect"
}

enum EArrowDirections {
  ArrowUp,
  ArrowDown
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements AfterViewInit {

  public scrollballs: any
  constructor(
    public sections: SectionsService,
    private _elementRef: ElementRef
  ) {
      setTimeout(() => {

      this.scrollballs = this._elementRef.nativeElement.querySelectorAll(".scrollball")

      this.scrollballs[ESections["main"]].classList += " selected";

      this.addingListeners()

      this.sections.sectionsMap.get("main")?.scrollIntoView({behavior: "smooth", block: "start", inline: "start"})
    })
  }

  ngAfterViewInit() {
  }

  addingListeners(){
    document.addEventListener('wheel', (e) => {
      this.scroll(e)
    })
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case EArrowDirections[0]: {
          if (this.sections.currentSection !== "main") this.moveUp(e)
          break;
        }
        case EArrowDirections[1]: {
          if (this.sections.currentSection !== "connect") this.moveDown(e)
          break;
        }
      }
    })
  }

  scroll(e: WheelEvent | KeyboardEvent): void {
    if(e instanceof WheelEvent ) {
      if(e.deltaY > 0){
        if(this.sections.currentSection !== ESections[5]) this.moveDown(e)
      } else  {
        if(this.sections.currentSection !== ESections[0]) this.moveUp(e)
      }
    }
  }

  moveDown(e: KeyboardEvent | WheelEvent){
    if (this.sections.delay < e.timeStamp) {
      this.sections.delay = e.timeStamp + 500;

      this.scrollballs[ESections[this.sections.currentSection]].classList = "scrollball";
      this.sections.currentSection = ESections[+ESections[this.sections.currentSection] + 1]
      this.scrollballs[ESections[this.sections.currentSection]].classList += " selected";

      this.sections.sectionsMap.get(this.sections.currentSection)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start"
        })

    }
  }
  moveUp(e: KeyboardEvent | WheelEvent){

    if (this.sections.delay < e.timeStamp) {
      this.sections.delay = e.timeStamp + 500;

      this.scrollballs[ESections[this.sections.currentSection]].classList = "scrollball";
      this.sections.currentSection = ESections[+ESections[this.sections.currentSection] - 1]
      this.scrollballs[ESections[this.sections.currentSection]].classList += " selected";

      this.sections.sectionsMap.get(this.sections.currentSection)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start"
        })

    }
  }
  navigate(sectionName: string){
    this.scrollballs[ESections[this.sections.currentSection]].classList = "scrollball"

    const sectionView = this.sections.sectionsMap.get(sectionName)
    this.sections.currentSection = sectionName

    this.scrollballs[ESections[sectionName]].classList += " selected"

    sectionView?.scrollIntoView({behavior: "smooth", block: "start", inline: "start"})
  }
}
