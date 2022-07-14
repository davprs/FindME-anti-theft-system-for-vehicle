function SettingsCard ({text, interactive}) {
    return (
        <div className={'settingsCard'}>
            <p className={'settingName'}>{text}</p>
            {interactive}
        </div>
    )
}

export default SettingsCard;