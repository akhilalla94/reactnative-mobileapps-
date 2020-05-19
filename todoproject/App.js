import React from 'react';
import { StyleSheet, Text, View,ScrollView,Button,SafeAreaView,TextInput } from 'react-native';
import {CheckBox} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [],date:""};
    

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);

  }
  handleDeleteTask(taskId) {
    console.log(taskId);
    let updatedList = this.state.list.filter(t => t.id !== taskId);
    console.log(updatedList);
    this.setState({ list: updatedList });
  }

  handleAddTask(task) {
    this.state.list.push(task);
    this.setState({ list: this.state.list });
  }
  
  handleCheckTask(i) {
    let compList = this.state.list;
    compList[i].checked = !compList[i].checked;
    this.setState({list:compList});
  }


  li() {
    return this.state.list.map((t,i) => {
      return (
        < ScrollView >
        <CheckBox title = {"Task:"+t.name + ", DueDate:"+(t.date)}  checked={t.checked} onPress={() => this.handleCheckTask(i)}/>
        <Button title = "Delete Task" onPress={() => this.handleDeleteTask(t.id)}/>
        </ScrollView>
         
      )
    })
}


  render() {

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>
            To Do Native App
          </Text>        
          <Form onAddTask={this.handleAddTask}/>
        </View>
        <View><Text>All Lists</Text></View>
        <ScrollView>
          {this.li()}
        </ScrollView>
      </SafeAreaView>

    );
  }
}

export class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      date: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ TextInputValue: event });
  }


  handleSubmit(event) {
    const tasksListItems = this.props.tasksListItems;
    event.preventDefault();
    const task = {
      id: Date.now(),
      name: this.state.TextInputValue,
      date: this.state.date,
      checked:false,
    };
    this.props.onAddTask(task);

  }

  render() {
    return (
      <View>
      <TextInput style={{ height: 60, borderWidth: 2 }} placeholder={"Add Task"} value={this.state.TextInputValue} onChangeText={this.handleChange}
      />
      <DatePicker
          style={{width: 400}}
          date={this.state.date}
          mode="date"
          placeholder="Select Date"
          format="DD-MM-YYYY"
          minDate="18-05-2020"
          maxDate="18-05-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
      <Button
            title="Add Task"
            onPress={this.handleSubmit}
        />
      </View> 


    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
    alignItems: 'center',
    justifyContent: 'center',
  },
});