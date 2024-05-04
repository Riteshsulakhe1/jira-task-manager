import { Button } from "@mui/material";

const EmptyScreen = () => {

    return (
        <div>
            <h5>No board found. Please create new sprint.</h5>
            <div>
                <Button>Create New Sprint</Button>
            </div>
        </div>
    )
};
export default EmptyScreen;