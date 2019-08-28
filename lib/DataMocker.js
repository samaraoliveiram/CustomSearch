import React from "react";

class DataMocker extends React.Component {
  constructor({ IO, name = "mockup_data" }) {
    super();
    this.getData = IO;
    this.state = {
      name,
      data: {}
    };
  }

  componentDidMount() {
    const { setState } = this;
    this.getData().then(data => setState.bind(this)({ data }));
  }

  render() {
    const mock_data = JSON.stringify(this.state.data, null, 2);
    const blob = new Blob([mock_data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    return (
      <div>
        <a href={url} download={`${this.state.name}.json`}>
          {this.props.children || `Download ${this.state.name}`}
        </a>
      </div>
    );
  }
}

export default DataMocker;
