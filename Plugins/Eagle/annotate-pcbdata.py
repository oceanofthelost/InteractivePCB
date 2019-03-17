#
#  Annotate pcbdata.json with "Customer Ref" entries from the bom-ex parts database
#
# Aaron Holtzman <aholtzma@gmail.com
#

import csv
import json
import dirtyjson
import sys

def load_db(fname):
    db = []
    with open(db_file) as csvfile:
        reader = csv.DictReader(csvfile, delimiter='\t')
        for line in reader:
            db.append(line)
    return db

def find_part(db, part):
    for line in db:
        if line['Mfg Part Num'] == part:
            return line
    raise ValueError

def load_json(fname): 
    with open(fname, 'r') as read_file:
        input_json = read_file.read()
        # Keep the javascript preamble to reattach later
        preamble = input_json[0:15]
        data = dirtyjson.loads(input_json[15:])
    return (preamble, data)

def save_json(fname, preamble, data):

    # Write the JSON back out
    with open(fname, 'w') as write_file:
        output_json = json.dumps(data, indent=5, sort_keys=True)
        write_file.write(preamble + output_json)

#########################

if len(sys.argv) < 3:
    print('usage: %s pcbdata.json db_file.csv' % (sys.argv[0]))
    sys.exit(1)

json_file = sys.argv[1]
db_file = sys.argv[2]

db = load_db(db_file)
(json_preamble, pcbdata) = load_json(json_file)


for e in pcbdata['bom']['both']:
    attr = e[4].split(';')
    attr_val = e[5].split(';')

    if 'Customer Ref' in attr:
        print('ERROR: pcbdata file already hase "Customer Ref" annotations')
        sys.exit(1)

    try:
        partno_ind = attr.index('PARTNO')
        partno = attr_val[partno_ind]
        db_part = find_part(db, partno)
        customer_ref = db_part['Customer Ref']
    except ValueError:
        customer_ref = ''
    e[4] += ';Customer Ref'
    e[5] += ';%s' % (customer_ref)


save_json(json_file, json_preamble, pcbdata)
