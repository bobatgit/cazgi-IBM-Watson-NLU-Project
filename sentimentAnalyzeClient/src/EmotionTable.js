import React from 'react';
// eslint-disable-next-line
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
    // Make a list out of the returned emotions using Object.entries()
    // It's a key-value pair otherwise. Can't loop over it.
    let emoList = Object.entries(this.props.emotions);

      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {/* {console.log(emoList)} */}
          {/* {JSON.stringify(this.props.emotions)}
          {console.log(typeof this.props.emotions)}
          {console.log(typeof Object.entries(this.props.emotions))}
          {console.log(Object.entries(this.props.emotions).map((element, index) => {
              return "x: " + index + ": " + element;
          }))} */}
          <table className="table table-bordered">
            <tbody>
            {
                emoList.map((element, index) => {
                    return <tr><td key={index}>{element[0]}</td><td>{element[1]}</td></tr>;
                })
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
