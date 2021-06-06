import React from 'react'
import {Breadcrumbs as BC, Link, Typography} from '@material-ui/core'
import {withRouter} from "react-router-dom"
  
  const Breadcrumbs = (props) => {
    const {history, location : {pathname} } = props;

    const pathnames = pathname.split("/").filter((x)=>x)

    return (
      <BC aria-label="breadcrumb" style={{background: '#ace0f9'}}>
        <Link onClick={()=>history.push("/")} color="inherit">Home</Link>
        {pathnames.map((name, index)=>{
            const routeTo = `/${pathnames.slice(0, index+1).join("/")}`
            const isLast = index === pathnames.length-1
            console.log({routeTo})
            return (
            isLast ? 
                <Typography>{name}</Typography> : 
                <Link 
                    onClick={()=>history.push({routeTo})} 
                    color="inherit"
                    key={name}
                >
                    {name}
                </Link>
            )
        })}
      </BC>
    );
  }

  export default withRouter(Breadcrumbs)