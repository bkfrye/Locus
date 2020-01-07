<div id="employer-form" data-model="employer" data-type="form">
    <input type="hidden" name="testimonial_id"/>
    <div class="form-hint" id="form-hint"></div>
    <div class="panel">
        <div class="panel-heading">
            <h6>General Settings</h6>
        </div>
        <div class="panel-body">
            <h5>Access</h5>
            <div class="input-group form-group">
                <span class="input-group-addon">Role:</span>
                <select name="settings_capabilities">
                    <option value="manage_options" selected>Admin</option>
                    <option value="edit_pages">Editor</option>
                    <option value="edit_posts">Author</option>
                </select>
            </div>
            <p class="hint">Minimun user role to access Team Builder admin page</p>
        </div>
    </div>
</div>
