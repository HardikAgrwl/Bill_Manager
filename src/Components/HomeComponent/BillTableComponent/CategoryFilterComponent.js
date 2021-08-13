import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useState } from "react";
import { connect } from "react-redux";
import { selectCategory } from "../../../actions/BillActions";

const ITEM_HEIGHT = 48;

function CategoryFilter({ categories, selectCategory }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const categoryList = useState(["All", ...categories])[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (category) => {
    if (typeof category === "string") selectCategory(category);
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Category Filter">
        <IconButton
          aria-label="category-filter"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleSelect}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {categoryList.map((category) => (
          <MenuItem
            key={category}
            selected={category === "Pyxis"}
            onClick={() => handleSelect(category)}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { selectCategory })(CategoryFilter);
