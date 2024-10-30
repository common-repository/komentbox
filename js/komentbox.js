var NLPComOptions = {};
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64
            } else if (isNaN(chr3)) {
                enc4 = 64
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
        }
        return output
    },
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2)
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3)
            }
        }
        output = Base64._utf8_decode(output);
        return output
    },
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128)
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128)
            }
        }
        return utftext
    },
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3
            }
        }
        return string
    }
};
if (typeof JSON !== 'object') {
    JSON = {}
}(function() {
    'use strict';

    function f(n) {
        return n < 10 ? '0' + n : n
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key)
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null'
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null'
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' '
                }
            } else if (typeof space === 'string') {
                indent = space
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify')
            }
            return str('', {
                '': value
            })
        }
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function(text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({
                    '': j
                }, '') : j
            }
            throw new SyntaxError('JSON.parse')
        }
    }
}());

jQuery(document).ready(function($) {
    kb_export();
    kb_import();
});

var kb_export = function() {
    jQuery(function($) {
        $('#kb_export a.button').unbind().click(function() {
            $('#kb_export .status').removeClass('kb-export-fail').addClass('kb-exporting').html('Processing...');
            kb_export_comments();
            return false;
        });
    });
};

var kb_export_comments = function() { 
    jQuery(function($) {
        var publisherkey = $('#publisherkey').val();
        var status = $('#kb_export .status');
        var nonce = $('#kb-form_nonce_export').val();
        var export_info = (status.attr('rel') || '0|' + (new Date().getTime()/1000)).split('|');   
	    var exportURL = '';
        $.get(
            adminVars.indexUrl,
            {
                cf_action: 'kb_export_comments',
                post_id: export_info[0],
                timestamp: export_info[1],
                _kbexport_wpnonce: nonce
            },
            function(response) {  
                switch (response.result) { 
                    case 'success':
                        
                        switch (response.status) {
                            case 'partial':
							    status.html(response.msg).attr('rel', response.post_id + '|' + response.timestamp);
								exportURL = response.wxr_file_name;
								saveExportData(publisherkey, exportURL);
                                kb_export_comments();
                            break;
                            case 'complete':
								NLPComOptions['msg'] = response.msg;
								NLPComOptions['post_id'] = response.post_id;
								NLPComOptions['timestamp'] = response.timestamp;
								//status.removeClass('kb-exporting').addClass('kb-exported');
								//status.html(response.msg).attr('rel', response.post_id + '|' + response.timestamp);
								exportURL = response.wxr_file_name;
								saveExportData(publisherkey, exportURL);
                            break;
                        }
                    break;
                    case 'fail':
                        status.parent().html(response.msg);
                        kb_export();
                    break;
                }
            },
            'json'
        );
    });
};

function NLPCheckIEVersion () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function makeCorsRequest(url, method, data, callback, errback) {  
    var req;
	var ieVersion;
    if(XMLHttpRequest) { 
        req = new XMLHttpRequest();
		ieVersion = NLPCheckIEVersion();  
		if(ieVersion && ieVersion <= 9){
			req = new XDomainRequest();
			req.open(method, url);
			req.onerror = errback;
			req.onload = function() {
				 window[callback](req.responseText);
			};
			req.send(data);
		}else{
			if('withCredentials' in req) { 
				req.open(method, url, true);
				req.onerror = errback;
				req.onreadystatechange = function() { 
					if (req.readyState === 4) {  
						if (req.status >= 200 && req.status < 400) {
							window[callback](req.responseText);
						} else {
							console.log('Response returned with non-OK status');
							window[errback](new Error('Response returned with non-OK status'));
						}
					}
				};
				req.send(data);
			}
		}
    } else if(XDomainRequest) {
        req = new XDomainRequest();
        req.open(method, url);
        req.onerror = errback;
        req.onload = function() {
             window[callback](req.responseText);
        };
        req.send(data);
    } else {
		console.log('CORS not supported');
	    window[errback](new Error('CORS not supported'));
    }
}
var saveExportData = function(publisherkey, exportURL){
	
	NLPComOptions['key'] = publisherkey;
	NLPComOptions['exportURL'] = exportURL;
	NLPComOptions['action'] = 'import';
	NLPComOptions['hostname'] = window.location.hostname;
    var NLPComOptionsStr = Base64.encode(JSON.stringify(NLPComOptions))
	
	var KBExportURL = 'http://analysis.nlpcaptcha.in/index.php/comments/processKBP/'+NLPComOptionsStr;
	makeCorsRequest(KBExportURL, 'GET', '', 'KBCBMethod', 'KBerrback');
};


var KBCBMethod = function(){  
	jQuery(function($) {
		var status = $('#kb_export .status');
		var msg = NLPComOptions['msg'];
		var post_id = NLPComOptions['post_id'];
		var timestamp = NLPComOptions['timestamp'];
		status.removeClass('kb-exporting').addClass('kb-exported');
		status.html(msg).attr('rel', post_id + '|' + timestamp);
	});
};

var KBerrback = function(){};

var kb_import = function() {
    jQuery(function($) {
        $('#kb_import a.button, #kb_import_retry').unbind().click(function() {
            //var wipe = $('#kb_import_wipe').is(':checked');
            var wipe = true;
            $('#kb_import .status').removeClass('kb-import-fail').addClass('kb-importing').html('Processing...');
            kb_import_comments(wipe);
            return false;
        });
    });
};


var kb_import_comments = function(wipe) {
    jQuery(function($) {
        var status = $('#kb_import .status');
        var nonce = $('#kb-form_nonce_import').val();
        var last_comment_id = status.attr('rel') || '0';
        $.get(
            adminVars.indexUrl,
            {
                cf_action: 'kb_import_comments',
                last_comment_id: last_comment_id,
                wipe: (wipe ? 1 : 0),
                _kbimport_wpnonce: nonce
            },
            function(response) {
                switch (response.result) {
                    case 'success':
                        status.html(response.msg).attr('rel', response.last_comment_id);
                        switch (response.status) {
                            case 'partial':
                                kb_import_comments(false);
                                break;
                            case 'complete':
                                status.removeClass('kb-importing').addClass('kb-imported');
                                break;
                        }
                    break;
                    case 'fail':
                        status.parent().html(response.msg);
                        kb_import();
                    break;
                }
            },
            'json'
        );
    });
};

