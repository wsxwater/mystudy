var React = require("react");
var ReactDOM = require('react-dom');

class Comp extends React.Component{
      constructor(...args){
        super(...args);
        this.txt=this.props.text.split(',');
      }
      render(){
          var arr=[];
          var len=this.txt.length;
          for (var i = 0; i < len; i++) {
            arr.push(<div className="navbar-menu-item" key={i}><a href="javascript:;" className="btn-block white-text">{this.txt[i]}</a></div>);
          }

          return <footer className="navbar-fixed">
                    <nav className="ControlWidth w100 lime darken-1 z-depth-1 navbar-menu">
                          <div className={"navbar-menu-list clearfixs center-align list-"+len}>{arr}</div>
                    </nav>
          </footer>;
      }
                       
}
window.onload=function(){
    var oDiv=document.getElementsByTagName('navbar-bottom')[0]; 
    ReactDOM.render(
               <Comp text="我的微网,我的名片" />, 
               oDiv
    );
};