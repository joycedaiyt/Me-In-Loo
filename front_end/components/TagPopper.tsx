import {
  ClickAwayListener,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Checkbox,
  Button,
} from "@mui/material";
import "@fontsource/montserrat";

export const TagPopper = (props: {
  anchorEl: any;
  tagPopOpen: boolean;
  setTagPopOpen: any;
  TagItems: Array<string>;
  selectedTags: Array<string>;
  setSelectedTags: any;
  confirmedTags: Array<string>;
  setConfirmedTags: any;
}) => {
  const {
    anchorEl,
    tagPopOpen,
    setTagPopOpen,
    TagItems,
    selectedTags,
    setSelectedTags,
    confirmedTags,
    setConfirmedTags,
  } = props;
  const handleChange = (el: any) => {
    if (el.target.checked === true) {
      selectedTags.push(el.target.id);
      setSelectedTags(selectedTags);
    } else {
      const newArr = selectedTags.filter((curElement) => {
        return curElement != el.target.id;
      });
      setSelectedTags(newArr);
    }
  };

  const handleConfirm = () => {
    setTagPopOpen(false);
    setConfirmedTags(selectedTags);
    setSelectedTags([]);
  };

  const handleClickAway = () => {
    setTagPopOpen(false);
    setSelectedTags([]);
  };
  return (
    <div>
      <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
        <Popper
          open={tagPopOpen}
          anchorEl={anchorEl.current}
          placement="bottom"
        >
          <Paper elevation={1} style={{ maxHeight: 200 }}>
            <MenuList
              style={{
                fontFamily: "montserrat",
                maxHeight: 200,
                overflow: "scroll",
              }}
            >
              {TagItems?.map((el, idx) => {
                return (
                  <MenuItem key={idx}>
                    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                      <Checkbox
                        size="small"
                        id={el}
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                        onChange={handleChange}
                      />
                      <span style={{ marginRight: 20, marginLeft: 5 }}>
                        {el}
                      </span>
                    </div>
                  </MenuItem>
                );
              })}
              <MenuItem style={{ cursor: "pointer" }} onClick={handleConfirm}>
                <div style={{ marginLeft: "25%", marginRight: "25%" }}>
                  Confirm
                </div>
              </MenuItem>
            </MenuList>
          </Paper>
        </Popper>
      </ClickAwayListener>
    </div>
  );
};
