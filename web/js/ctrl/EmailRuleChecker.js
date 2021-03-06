"use strict";

tutao.provide('tutao.tutanota.ctrl.EmailRuleChecker');

tutao.tutanota.ctrl.EmailRuleChecker = function(mailFolderViewModel) {
    tutao.util.FunctionUtils.bindPrototypeMethodsToThis(this);
    this._mailFolderViewModel = mailFolderViewModel;
};


/**
 * Checks the mail for an existing inbox rule and moves the mail to the target folder of the rule.
 * @param {tutao.entity.tutanota.Mail} mail The mail to check.
 * @returns {Promise.<bool>} Returns if the mail has been moved or not.
 */
tutao.tutanota.ctrl.EmailRuleChecker.prototype.checkForInboxRule = function(mail){
    var self = this;
    if (mail.getUnread() && tutao.locator.viewManager.isPremiumAccount()) {
        var inboxRule = this._findMatchingRule(mail);
        if (inboxRule != null){
            var targetFolder = tutao.locator.mailFolderListViewModel.findFolder(inboxRule.getTargetFolder());
            if (targetFolder != null) {
                return self._mailFolderViewModel.move(targetFolder, [mail]).then(function () {
                    return true;
                });
            }
        }
    }
    return Promise.resolve(false);
};

/**
 * Finds the first matching inbox rule for the mail and returns it. If no rule matches null returns.
 * @param {tutao.entity.tutanota.Mail} mail The mail to find a rule for.
 * @returns {tutao.entity.tutanota.InboxRule} The first matching inbox rule or null.
 * @private
 */
tutao.tutanota.ctrl.EmailRuleChecker.prototype._findMatchingRule = function(mail){
    var inboxRules = tutao.locator.mailBoxController.getUserProperties().getInboxRules();
    for ( var i=0; i< inboxRules.length; i++) {
        var inboxRule = inboxRules[i];
        var ruleType = inboxRule.getType();
        if (ruleType == tutao.entity.tutanota.TutanotaConstants.INBOX_RULE_SENDER_EQUALS ) {
            if (this._checkEmailAddress( mail.getSender().getAddress(),inboxRule.getValue())){
                return inboxRule;
            }
        } else if (ruleType == tutao.entity.tutanota.TutanotaConstants.INBOX_RULE_RECIPIENT_TO_EQUALS) {
            if (this._containsEmailAddress(mail.getToRecipients(), inboxRule.getValue())){
                return inboxRule;
            }
        } else if (ruleType == tutao.entity.tutanota.TutanotaConstants.INBOX_RULE_RECIPIENT_CC_EQUALS) {
            if (this._containsEmailAddress(mail.getCcRecipients(), inboxRule.getValue())){
                return inboxRule;
            }

        } else if (ruleType == tutao.entity.tutanota.TutanotaConstants.INBOX_RULE_RECIPIENT_BCC_EQUALS) {
            if (this._containsEmailAddress(mail.getBccRecipients(), inboxRule.getValue())){
                return inboxRule;
            }
        } else if (ruleType == tutao.entity.tutanota.TutanotaConstants.INBOX_RULE_SUBJECT_CONTAINS) {
            if (mail.getSubject().indexOf(inboxRule.getValue()) >= 0 ){
                return inboxRule;
            }
        }
    }
    return null;
};

/**
 * @param {Array.<tutao.entity.tutanota.MailAddress>} mailAddresses
 * @param {String} inboxRuleValue
 * @return {boolean}
 */
tutao.tutanota.ctrl.EmailRuleChecker.prototype._containsEmailAddress = function(mailAddresses, inboxRuleValue){
    for( var i = 0; i<mailAddresses.length;i++){
        if (this._checkEmailAddress(mailAddresses[i].getAddress(), inboxRuleValue)){
            return true;
        }
    }
    return false;
};

tutao.tutanota.ctrl.EmailRuleChecker.prototype._checkEmailAddress = function(mailAddress, inboxRuleValue) {
    var cleanMailAddress = mailAddress.toLowerCase().trim();
    if (tutao.tutanota.util.Formatter.isDomainName(inboxRuleValue)) {
        var domain = cleanMailAddress.split("@")[1];
        if (domain == inboxRuleValue) {
            return true;
        }
    } else {
        if (cleanMailAddress == inboxRuleValue) {
            return true;
        }
    }
    return false;
};