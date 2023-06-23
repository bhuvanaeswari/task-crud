import { InputLabel } from "@mui/material"
export default ({ label, star = "", children }) => {
    return <div>
        <InputLabel  sx={{fontWeight:"bold",marginTop:"10px",marginBottom:"5px",marginLeft:"-75px"}}>
            {label}<span  style={{color:"red"}}> {star}</span>
        </InputLabel>
        {children}
    </div>
}