<?php
    /**
        Add or Edit Employer Form
    */
?>
<div id="employer-form" data-model="employer" data-type="form">
    <input type="hidden" name="employer_id"/>
    <div class="panel">
        <div class="panel-heading">
            <h6>General Information</h6>
        </div>
        <div class="panel-body">
            <div class="form-group foto-upload clearfix">
                <input type="hidden" name="employer_thumbnail_id"/>
                <div class="foto-wrapper" id="employer-form-foto"></div>
                <div>
                    <h5>Add Employee's Photo</h5>
                    <p class="hint">At least 100x100px. JPG and PNG are OK.</p>
                    <ul>
                        <li>
                            <button data-action="upload_photo" class="btn btn-default" title="Browse">
                                <span>Browse</span>
                            </button>
                        </li>
                        <li>
                            <button id="employer-form-foto-remove" data-action="remove_photo" class="btn btn-danger" title="Remove">
                                <span>Remove</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <h5>Describe Employee</h5>
            <div class="input-group form-group">
                <span class="input-group-addon">Employee Name:</span>
                <input type="text" class="form-control" name="employer_name" placeholder="e.g. John Doe"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Occupation:</span>
                <input type="text" class="form-control" name="employer_position" placeholder="e.g. Designer"/>
            </div>
            <div class="input-group form-group ats-loading">
                <span class="input-group-addon">Department:</span>
                <input type="text" class="form-control" name="employer_department" placeholder="e.g. Designers"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Profile URL:</span>
                <input type="text" class="form-control" name="employer_profile" placeholder="Individual bio page on your website (if exist)"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Tagline:</span>
                <textarea name="employer_short_bio" class="form-control" rows="3" placeholder="Tell awesome story" ></textarea>
            </div>
            <div data-type="employer-alert" class="skill-alert"></div>
        </div>
    </div>
    <div class="panel">
        <div class="panel-heading">
            <h6>Panel settings</h6>
        </div>
        <div class="panel-body">
            <h5>Panel content</h5>
            <div class="input-group form-group">
                <div class="employer_panel_text"></div>
            </div>
        </div>
    </div>
    <div class="panel">
        <div class="panel-heading">
            <h6>Contacts & Social profiles</h6>
        </div>
        <div class="panel-body">
            <h5>Contacts</h5>
            <div class="input-group form-group">
                <span class="input-group-addon">Email:</span>
                <input type="text" class="form-control" name="employer_email" placeholder="e.g. john@example.com"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Phone:</span>
                <input type="text" class="form-control" name="employer_phone" placeholder="e.g. 555-555-5555"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Skype:</span>
                <input type="text" class="form-control" name="employer_skype" placeholder="e.g. john_doe"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Website URL:</span>
                <input type="text" class="form-control" name="employer_link" placeholder="Personal website URL"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Website Label:</span>
                <input type="text" class="form-control" name="employer_link_text" placeholder="e.g. Personal website"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Location:</span>
                <input type="text" class="form-control" name="employer_location" placeholder="e.g. New York"/>
            </div>
            <h5>Social Profiles</h5>
            <div class="input-group form-group">
                <span class="input-group-addon">Facebook:</span>
                <input type="text" class="form-control" name="employer_facebook" placeholder="https://www.facebook.com/username"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Twitter:</span>
                <input type="text" class="form-control" name="employer_twitter" placeholder="https://twitter.com/username"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Linkedin:</span>
                <input type="text" class="form-control" name="employer_linkedin" placeholder="https://www.linkedin.com/profile/view?id=0000000"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Google+:</span>
                <input type="text" class="form-control" name="employer_google" placeholder="https://plus.google.com/username/posts"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Instagram:</span>
                <input type="text" class="form-control" name="employer_instagram" placeholder="https://instagram.com/username/"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Pinterest:</span>
                <input type="text" class="form-control" name="employer_pinterest" placeholder="https://pinterest.com/username/"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Youtube:</span>
                <input type="text" class="form-control" name="employer_youtube" placeholder="https://www.youtube.com/user/username"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Vimeo:</span>
                <input type="text" class="form-control" name="employer_vimeo" placeholder="https://vimeo.com/username"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Dribbble:</span>
                <input type="text" class="form-control" name="employer_dribble" placeholder="https://dribbble.com/username"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Flickr:</span>
                <input type="text" class="form-control" name="employer_flickr" placeholder="https://www.flickr.com/photos/username/"/>
            </div>
            <div class="input-group form-group">
                <span class="input-group-addon">Github:</span>
                <input type="text" class="form-control" name="employer_github" placeholder="https://github.com/username"/>
            </div>
        </div>
    </div>
    <div class="panel panel-skills">
        <div class="panel-heading">
            <h6>Skills</h6>
        </div>
        <div class="panel-body">
            <h5>Employee's skills</h5>
            <ul class="skills-list awesome-list"></ul>
            <h5>Add new skill</h5>
            <p class="hint">Consider to add no more than 4-5 skills. Keep skill names short.</p>
            <div class="skill-form" data-form="add-skill"></div>
        </div>
    </div>
</div>
