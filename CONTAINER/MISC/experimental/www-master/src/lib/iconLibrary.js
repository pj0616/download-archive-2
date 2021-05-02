import { config, library } from '@fortawesome/fontawesome-svg-core'
import {
  faLongArrowDown,
  faLongArrowUp,
  faLongArrowRight,
  faAngleDown,
  faTimes,
} from '@fortawesome/pro-light-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false
library.add(
  faLongArrowUp,
  faLongArrowDown,
  faLongArrowRight,
  faInstagram,
  faAngleDown,
  faTimes,
)
