import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formControl: {
    display: 'flex'
  }
});

function FilterDialog(props) {
  const {
    isFiltering,
    filter,
    handleFilterSubmit,
    handleInputChange,
    triggerFilterDialog,
    classes
  } = props;
  const languages = ['all', 'english', 'kazakh'];
  return (
    <Dialog
      open={isFiltering}
      onClose={triggerFilterDialog}
      aria-labelledby="form-dialog-title"
      >
      <DialogTitle id="form-dialog-title">Filter</DialogTitle>
      <DialogContent>
      <FormControl >
        <FormLabel>Status</FormLabel>
          <RadioGroup
            row
            name="status"
            aria-label="color"
            value={filter.status}
            onChange={handleInputChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="online" control={<Radio />} label="Online" />
            <FormControlLabel value="offline" control={<Radio />} label="Offline" />
          </RadioGroup>
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel>Language</FormLabel>
          <Select
            value={filter.language}
            onChange={handleInputChange}
            inputProps={{
              name: 'language',
              id: 'language-simple',
            }}
          >
            {languages.map((language, index) =>
              (<MenuItem key={index} value={language}>
              {language.charAt(0).toUpperCase() + language.slice(1)}
              </MenuItem>))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary"
          onClick={handleFilterSubmit}
        >
          Filter
          <SearchIcon />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(FilterDialog);