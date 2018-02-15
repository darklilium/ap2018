
import React from 'react';
import env from '../../services/config';
import { Image } from 'semantic-ui-react';

const Logo = () =>{
//  return (<div className="logo_img"><img src={env.CSSDIRECTORY+'/images/logo_ap.png'} /></div>);
return (<Image src={env.CSSDIRECTORY+'/images/logo_ap.png'} avatar className="logo_img" />)
}

export default class HeaderMenu extends React.Component {
    render() {
        return (
            <div className="muni_header">
              <Logo />

            </div>
        );
    }

}
