import json,glob,pathlib,sys
here=pathlib.Path(__file__).parent;f=here/'extra.json'
ex=json.loads(f.read_text()) if f.exists() else []
have={(a,b) for a,b in ex};n=0
for c in glob.glob(sys.argv[1]+'/cov_*.json'):
    for spk,s,kind in json.load(open(c))['miss']:
        if 'undefined' in s: continue
        if (spk,s) not in have: ex.append([spk,s]);have.add((spk,s));n+=1
f.write_text(json.dumps(ex,ensure_ascii=False,indent=0));print('extra +',n,'total',len(ex))
