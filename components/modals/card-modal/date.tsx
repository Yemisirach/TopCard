import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DueDateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DueDateModal: React.FC<DueDateModalProps> = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [dueTime, setDueTime] = useState<Date | null>(null);
  const [reminder, setReminder] = useState<string>('None');

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleDueDateChange = (date: Date | null) => {
    setDueDate(date);
  };

  const handleDueTimeChange = (date: Date | null) => {
    setDueTime(date);
  };

  const handleReminderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReminder(e.target.value);
  };

  const handleSave = () => {
    // You can perform any actions with the selected dates and reminder here
    console.log('Selected Start Date:', startDate);
    console.log('Selected Due Date:', dueDate);
    console.log('Selected Due Time:', dueTime);
    console.log('Selected Reminder:', reminder);

    // Close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Due Date Modal">
      <h2>Set Due Date</h2>
      <div>
        <label>Start Date:</label>
        <DatePicker selected={startDate} onChange={handleStartDateChange} dateFormat="M/d/yyyy" />
      </div>
      <div>
        <label>Due Date:</label>
        <DatePicker selected={dueDate} onChange={handleDueDateChange} dateFormat="M/d/yyyy" />
      </div>
      <div>
        <label>Due Time:</label>
        <DatePicker selected={dueTime} onChange={handleDueTimeChange} showTimeSelect showTimeSelectOnly timeIntervals={15} dateFormat="h:mm aa" />
      </div>
      <div>
        <label>Set Due Date Reminder:</label>
        <select value={reminder} onChange={handleReminderChange}>
          <option value="None">None</option>
          {/* Add additional reminder options if needed */}
        </select>
      </div>
      <button onClick={handleSave}>Save Due Date</button>
      <button onClick={onClose}>Close Modal</button>
    </Modal>
  );
};

export default DueDateModal;
