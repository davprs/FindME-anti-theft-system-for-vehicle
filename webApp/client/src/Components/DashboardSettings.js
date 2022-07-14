import SettingsCard from './SettingsCard';
import Switch from './Switch';

function DashboardSettings ({toggleHtmlTheme, darkTheme, setDarkTheme}) {


    function handleThemeSwitch () {
        toggleHtmlTheme();
        setDarkTheme(! darkTheme);
    }
    function isDarkSetted (){
        return document.querySelector('html').classList.contains('dark');
    }

    return (
        <div className={'settingsContainer'}>
            <SettingsCard text={'Tema scuro'} interactive={<Switch switchId={'themeSwitch'} handleSwitch={handleThemeSwitch} checked={isDarkSetted}/>} />
            <SettingsCard text={'Fake setting 1'} interactive={<Switch switchId={'fakeSetting1'} handleSwitch={() => console.log('non faccio nulla')} checked={() => false}/>} />
            <SettingsCard text={'Fake setting 2'} interactive={<Switch switchId={'fakeSetting2'} handleSwitch={() => console.log('non faccio nulla')} checked={() => true}/>} />
        </div>
    );
}

export default DashboardSettings;