### RN-Toggle
A customizable toggle switch for React Native that works on Android and iOS without any extra installation steps.

###Installation:
`$ npm install rn-toggle`

###Basic Usage:
```javascript
import Toggle from 'rn-toggle';
....
const [isActive, setIsActive] = useState(false);
....
<Toggle isActive={isActive} toggle={() => setIsActive(value => !value)} />
```

###Customized Usage:
```javascript
import Toggle from 'rn-toggle';
....
const [isActive, setIsActive] = useState(false);
....
<Toggle
	width={70}
	isActive={isActive}
	toggle={toggle}
	activeColor='#000000'
	text={isActive ? 'on ' : 'off'}
	textStyle={{ color: isActive ? '#FFFFFF' : '#666666' }}
	cursorColor='#FF0000'
	inactiveColor='#FFFFFF'
	borderColor='#FF0000'
/>
```
###Props
Name | Type | Required | Default | Description
------------- | -------------
containerStyle | Object | no | {} | Styling for the outermost component
isActive |	Boolean | no | false | Value that determines whether the toggle is switched on or off
toggle | Function | no | () => null | Action to perform when the toggle switch is pressed
width | Integer | no | 50 | Sets the width of the toggle switch
duration | Integer | no | 150 | Time that the animation takes in milliseconds
textStyle | Object | no | {} | Styling for the toggle text
text | String | no | null | Text to display on the toggle
disabled | Boolean | no | false | Value that determines whether the toggle switch is disabled or not
vertical | Boolean | no | false | Value that determines whether the toggle switch is vertical or horizontal
cursorColor | Hexadecimal String | no | '#FFFFFF' | Sets the color of the cursor
borderColor | Hexadecimal String | no | '#EEEEEE' | Sets the border color of the toggle switch
activeColor | Hexadecimal String | no | '#4CD862' | Sets the color of the toggle switch when active
inactiveColor | Hexadecimal String | no | '#DDDDDD' | Sets the color of the toggle switch when inactive
###Contributing
Pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.
###License
[MIT](https://github.com/Abuda/rn-toggle/blob/master/LICENSE)
###Authors
+ [Abuda](https://github.com/Abuda)
