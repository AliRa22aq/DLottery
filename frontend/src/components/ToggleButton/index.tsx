import React, { FC } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

interface ToggleButtonsProps {
    text1: string,
    text2: string
}

const ToggleButtons: FC<ToggleButtonsProps> = ({ text1, text2 }) => {

    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            sx={{ height: "100%" }}
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton
                sx={{
                    border: 0, fontSize: "8px", borderRadius: 0, '&.MuiToggleButton-root.Mui-selected': {
                        backgroundColor: "#ff6565",
                        color: "#fff"
                    }
                }}
                value="all" >{text1}</ToggleButton>
            <ToggleButton
                sx={{
                    border: 0, fontSize: "8px", borderRadius: 0, '&.MuiToggleButton-root.Mui-selected': {
                        backgroundColor: "#ff6565",
                        color: "#fff"
                    }
                }}
                value="my">{text2}</ToggleButton>

        </ToggleButtonGroup>)
}

export default ToggleButtons
