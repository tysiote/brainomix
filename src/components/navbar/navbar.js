import './navbar.scss'
import { useImage } from '../../services/use-image'
import { useDispatch, useSelector } from 'react-redux'
import { setLocale } from '../../services/redux/reducers/locale-reducer'
import { MenuItem, Select } from '@mui/material'

// a simple navigation bar component, that currently has the `Project Logo` and `Language dropdown`
export const Navbar = () => {
  const locale = useSelector((state) => state.locale.locale)
  const [imageEN] = useImage('en-150')
  const [imageSK] = useImage('sk-SK')
  const dispatch = useDispatch()

  // to include a new language, simply add an item here, create a flag file (.png) in `assets` and write as much translation files as you want
  const items = [
    { value: 'en-150', image: imageEN, label: 'English' },
    { value: 'sk-SK', image: imageSK, label: 'Slovensky' }
  ]

  return (
    <div className="navbar">
      <div className="navbar-application-label">Brainomix data test</div>
      <div className="navbar-dropdown-wrapper">
        <Select
          className="navbar-dropdown"
          value={locale}
          onChange={(event) => {
            dispatch(setLocale(event.target.value))
          }}>
          {items.map((lang) => (
            <MenuItem value={lang.value} key={`language-item-${lang.value}`}>
              <div className="language-option">
                <img src={lang.image} alt="language-image" />
                <span>{lang.label}</span>
              </div>
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
